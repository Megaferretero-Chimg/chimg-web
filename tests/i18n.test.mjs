import assert from 'node:assert/strict';
import { test } from 'node:test';
import { resolveLanguage } from '../lib/i18n/language.js';

test('manual preference overrides browser language', () => {
  assert.equal(resolveLanguage('es', 'en-US,en;q=0.9'), 'es');
  assert.equal(resolveLanguage('en', 'es-EC,es;q=0.9'), 'en');
  assert.equal(resolveLanguage('invalid', 'es-EC'), 'es');
});
test('negotiates language variants and ranked preferences', () => {
  assert.equal(resolveLanguage(null, 'en-GB,en;q=0.9,es;q=0.8'), 'en');
  assert.equal(resolveLanguage(null, 'en;q=0.2,es-EC;q=0.9'), 'es');
  assert.equal(resolveLanguage(null, 'fr-FR,es;q=0.8,en;q=0.5'), 'es');
  assert.equal(resolveLanguage(null, 'es;q=0,en;q=1'), 'en');
  assert.equal(resolveLanguage(null, 'fr-FR'), 'en');
  assert.equal(resolveLanguage(null, ''), 'es');
});

const base = process.env.TEST_BASE_URL ?? 'http://localhost:3000';
const routes = ['/', '/about', '/services', '/contact', '/product-lines', '/business-cards', '/business-cards/michelle-chiluisa', ...['home-living','finishes','machinery','construction','hardware'].map(slug=>`/product-lines/${slug}`)];
for (const route of routes) {
  test(`renders both languages on ${route}`, async () => {
    for (const language of ['es','en']) {
      const response = await fetch(base + route, {headers:{'Accept-Language':language === 'en' ? 'en-US,en;q=0.9' : 'es-EC,es;q=0.9'}});
      assert.equal(response.status,200);
      const html = await response.text();
      assert.ok(html.includes(`<html lang="${language}">`));
      assert.ok(html.includes(language === 'en' ? 'Skip to content' : 'Saltar al contenido'));
      assert.ok(html.includes(language === 'en' ? 'Change language' : 'Cambiar idioma'));
      const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
      if(language === 'en') for(const text of ['Guardar contacto','Copiar enlace de mi tarjeta','Nuestras líneas','Preparar consulta','PÁGINA NO ENCONTRADA']) assert.ok(!markup.includes(text), `Untranslated: ${text}`);
    }
  });
}
test('saved language wins on page and vCard, invalid routes return 404', async () => {
  const headers = {'Accept-Language':'en-US', Cookie:'chimg-language=es'};
  const html = await (await fetch(base+'/business-cards/michelle-chiluisa',{headers})).text();
  assert.ok(html.includes('<html lang="es">'));
  const vcf = await (await fetch(base+'/business-cards/michelle-chiluisa/contact.vcf',{headers})).text();
  assert.ok(vcf.includes('TITLE:Gerente de ventas\r\n'));
  assert.ok(vcf.includes('TEL;TYPE=CELL:+593959739185\r\n'));
  const englishVcf = await (await fetch(base+'/business-cards/michelle-chiluisa/contact.vcf',{headers:{'Accept-Language':'en'}})).text();
  assert.ok(englishVcf.includes('TITLE:Sales Manager\r\n'));
  assert.equal((await fetch(base+'/business-cards/missing/contact.vcf')).status,404);
});
