import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Add Confetti CDN
head_replacement = '''    <!-- Lucide Icons CDN -->
    <script src=\"https://unpkg.com/lucide@latest\"></script>
    <!-- Canvas Confetti CDN -->
    <script src=\"https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js\"></script>'''
html = html.replace('    <!-- Lucide Icons CDN -->\n    <script src=\"https://unpkg.com/lucide@latest\"></script>', head_replacement)

# 2. Add Catalog Filters
filters_html = '''            <div class=\"section-header\">
                <span class=\"section-tag\">
                    <i data-lucide=\"flower\"></i>
                    Nuestro Catálogo
                </span>
                <h2>Elige el ramo perfecto para cada ocasión</h2>
                <p>Cada rosa es cuidadosamente seleccionada y preservada para mantener su belleza natural durante años.
                </p>
            </div>
            
            <!-- Catalog Filters -->
            <div class=\"catalog-filters\" data-aos=\"fade-up\">
                <button class=\"filter-btn active\" data-filter=\"all\">Todos</button>
                <button class=\"filter-btn\" data-filter=\"ramos\">Clásicos</button>
                <button class=\"filter-btn\" data-filter=\"premium\">Premium</button>
                <button class=\"filter-btn\" data-filter=\"tematicos\">Temáticos</button>
            </div>

            <div class=\"catalog-grid\">'''
html = re.sub(r'            <div class=\"section-header\">\s*<span class=\"section-tag\">\s*<i data-lucide=\"flower\"></i>\s*Nuestro Catálogo\s*</span>\s*<h2>Elige el ramo perfecto para cada ocasión</h2>\s*<p>Cada rosa es cuidadosamente seleccionada y preservada para mantener su belleza natural durante años.\s*</p>\s*</div>\s*<div class=\"catalog-grid\">', filters_html, html)

# 3. Add data-category to product cards based on names
# Ramo 1: Encanto Morado
html = html.replace('<!-- Ramo 1: Encanto Morado -->\n                <div class=\"product-card\" data-aos=\"fade-up\">', '<!-- Ramo 1: Encanto Morado -->\n                <div class=\"product-card\" data-category=\"ramos\" data-aos=\"fade-up\">')
# Ramo 2: Tierno Detalle
html = html.replace('<!-- Ramo 2: Tierno Detalle -->\n                <div class=\"product-card\" data-aos=\"fade-up\" data-aos-delay=\"100\">', '<!-- Ramo 2: Tierno Detalle -->\n                <div class=\"product-card\" data-category=\"premium\" data-aos=\"fade-up\" data-aos-delay=\"100\">')
# Ramo 3: Adoro Mi Amor
html = html.replace('<!-- Ramo 3: Adoro Mi Amor -->\n                <div class=\"product-card\" data-aos=\"fade-up\" data-aos-delay=\"200\">', '<!-- Ramo 3: Adoro Mi Amor -->\n                <div class=\"product-card\" data-category=\"ramos\" data-aos=\"fade-up\" data-aos-delay=\"200\">')
# Ramo 4: Princesa Real
html = html.replace('<!-- Ramo 4: Princesa Real -->\n                <div class=\"product-card featured\" data-aos=\"fade-up\" data-aos-delay=\"300\">', '<!-- Ramo 4: Princesa Real -->\n                <div class=\"product-card featured\" data-category=\"premium\" data-aos=\"fade-up\" data-aos-delay=\"300\">')
# Ramo 5: Clásico Elegante
html = html.replace('<!-- Ramo 5: Clásico Elegante -->\n                <div class=\"product-card\" data-aos=\"fade-up\">', '<!-- Ramo 5: Clásico Elegante -->\n                <div class=\"product-card\" data-category=\"ramos\" data-aos=\"fade-up\">')
# Ramo 6: Lotso Berry
html = html.replace('<!-- Ramo 6: Lotso Berry -->\n                <div class=\"product-card\" data-aos=\"fade-up\" data-aos-delay=\"100\">', '<!-- Ramo 6: Lotso Berry -->\n                <div class=\"product-card\" data-category=\"tematicos\" data-aos=\"fade-up\" data-aos-delay=\"100\">')
# Ramo 7: Feliz Día
html = html.replace('<!-- Ramo 7: Feliz Día -->\n                <div class=\"product-card\" data-aos=\"fade-up\" data-aos-delay=\"200\">', '<!-- Ramo 7: Feliz Día -->\n                <div class=\"product-card\" data-category=\"ramos\" data-aos=\"fade-up\" data-aos-delay=\"200\">')
# Ramo 8: Cielo Azul
html = html.replace('<!-- Ramo 8: Cielo Azul -->\n                <div class=\"product-card\" data-aos=\"fade-up\" data-aos-delay=\"300\">', '<!-- Ramo 8: Cielo Azul -->\n                <div class=\"product-card\" data-category=\"ramos\" data-aos=\"fade-up\" data-aos-delay=\"300\">')
# Ramo 9: Kitty Love
html = html.replace('<!-- Ramo 9: Kitty Love -->\n                <div class=\"product-card\" data-aos=\"fade-up\">', '<!-- Ramo 9: Kitty Love -->\n                <div class=\"product-card\" data-category=\"tematicos\" data-aos=\"fade-up\">')
# Ramo 10: Sol y Pasión
html = html.replace('<!-- Ramo 10: Sol y Pasión -->\n                <div class=\"product-card\" data-aos=\"fade-up\" data-aos-delay=\"100\">', '<!-- Ramo 10: Sol y Pasión -->\n                <div class=\"product-card\" data-category=\"premium\" data-aos=\"fade-up\" data-aos-delay=\"100\">')
# Ramo 11: Para Mamá / Especial
html = html.replace('<!-- Ramo 11: Para Mamá / Especial -->\n                <div class=\"product-card\" data-aos=\"fade-up\" data-aos-delay=\"200\">', '<!-- Ramo 11: Para Mamá / Especial -->\n                <div class=\"product-card\" data-category=\"ramos\" data-aos=\"fade-up\" data-aos-delay=\"200\">')
# Ramo 12: Magno Cumpleaños
html = html.replace('<!-- Ramo 12: Magno Cumpleaños -->\n                <div class=\"product-card featured\" data-aos=\"fade-up\" data-aos-delay=\"300\">', '<!-- Ramo 12: Magno Cumpleaños -->\n                <div class=\"product-card featured\" data-category=\"premium\" data-aos=\"fade-up\" data-aos-delay=\"300\">')
# Ramo 13: Hero Spidey
html = html.replace('<!-- Ramo 13: Hero Spidey -->\n                <div class=\"product-card\" data-aos=\"fade-up\">', '<!-- Ramo 13: Hero Spidey -->\n                <div class=\"product-card\" data-category=\"tematicos\" data-aos=\"fade-up\">')

# 4. Care Section
care_html = '''    <!-- ========== CARE SECTION ========== -->
    <section class=\"care-section\" id=\"cuidados\">
        <div class=\"container\">
            <div class=\"section-header\">
                <span class=\"section-tag\">
                    <i data-lucide=\"shield-check\"></i>
                    Cuidados Especiales
                </span>
                <h2>Cómo cuidar tus rosas eternas</h2>
                <p>Nuestras rosas no necesitan agua ni luz, pero con estos simples cuidados te durarán años intactas.</p>
            </div>
            <div class=\"care-grid\">
                <div class=\"care-card\" data-aos=\"fade-up\">
                    <div class=\"care-icon\"><i data-lucide=\"droplet-off\"></i></div>
                    <h3>Cero Agua</h3>
                    <p>No las riegues ni las rocíes con ningún líquido. La humedad daña irreversiblemente la preservación.</p>
                </div>
                <div class=\"care-card\" data-aos=\"fade-up\" data-aos-delay=\"100\">
                    <div class=\"care-icon\"><i data-lucide=\"sun-dim\"></i></div>
                    <h3>Evita el Sol Directo</h3>
                    <p>La luz ultravioleta o solar directa puede decolorar los pétalos con el paso del tiempo.</p>
                </div>
                <div class=\"care-card\" data-aos=\"fade-up\" data-aos-delay=\"200\">
                    <div class=\"care-icon\"><i data-lucide=\"wind\"></i></div>
                    <h3>Evita Corrientes</h3>
                    <p>Mantenlas en ambientes interiores, lejos de ventiladores fuertes o salidas de aire acondicionado.</p>
                </div>
                <div class=\"care-card\" data-aos=\"fade-up\" data-aos-delay=\"300\">
                    <div class=\"care-icon\"><i data-lucide=\"brush\"></i></div>
                    <h3>Limpieza Delicada</h3>
                    <p>Si acumulan polvo, usa un secador en aire muy frío y suave, o retíralo con un pincel seco.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ========== FAQ SECTION ========== -->'''
html = html.replace('    <!-- ========== FAQ SECTION ========== -->', care_html)

# 5. Lightbox
lightbox_html = '''    <!-- ========== LIGHTBOX MODAL ========== -->
    <div class=\"lightbox-overlay\" id=\"lightbox-overlay\">
        <button class=\"lightbox-close\" id=\"lightbox-close\" aria-label=\"Cerrar galería\"><i data-lucide=\"x\"></i></button>
        <img src=\"\" alt=\"Vista ampliada\" class=\"lightbox-img\" id=\"lightbox-img\">
    </div>

    <script src=\"script.js\"></script>'''
html = html.replace('    <script src=\"script.js\"></script>', lightbox_html)

# 6. Boton diseno unico
old_btn = '''<a href=\"https://wa.me/51946759953?text=Hola%2C%20quiero%20personalizar%20mi%20ramo%20con%20accesorios%20adicionales\"
                    class=\"btn btn-primary\" target=\"_blank\" id=\"cta-personalizar\">
                    <i data-lucide=\"sparkles\"></i>
                    Personalizar mi Ramo
                </a>'''
new_btn = '''<a href=\"#\" class=\"btn btn-primary\" id=\"cta-diseno-unico\">
                    <i data-lucide=\"sparkles\"></i>
                    Crear Diseño Único
                </a>'''
html = html.replace(old_btn, new_btn)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('HTML modifications applied successfully.')
