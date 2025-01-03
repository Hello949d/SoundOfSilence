document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartContainer = document.getElementById('cart');
    const totalPriceElement = document.getElementById('total-price');
    const discountBanner = document.createElement('p4');  // Rabatt-Banner

    function addToCart(name, price) {
        cart.push({ name, price });
        updateCart();
    }

    function removeFromCart(index) {
        if (index >= 0 && index < cart.length) {
            cart.splice(index, 1);
            updateCart();
        }
    }

    function updateCart() {
        cartContainer.innerHTML = '';
        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Der Warenkorb ist leer.</p    >';
        } else {
            const ul = document.createElement('ul');
            cart.forEach((item, index) => {
                const discountedPrice = applyDiscount(item.price);
                const discountReason = getDiscountReason();
                
                const li = document.createElement('li');
                
                // Originalpreis, Rabatt und Grund anzeigen
                li.innerHTML = `
                    <span>${item.name} - ${item.price.toFixed(2)} € 
                    ${discountedPrice < item.price ? '<span style="color: red;"> -10% ( ' + discountReason + ')</span>' : ''}</span>
                    <img src="images/remove.png" alt="Entfernen" data-index="${index}">
                `;
                ul.appendChild(li);
            });
            cartContainer.appendChild(ul);

            const removeButtons = document.querySelectorAll('#cart img');
            removeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const index = button.getAttribute('data-index');
                    removeFromCart(parseInt(index, 10));
                });
            });
        }
        updateTotalPrice();
    }

    function updateTotalPrice() {
        const total = cart.reduce((sum, item) => sum + applyDiscount(item.price), 0);
        totalPriceElement.textContent = total.toFixed(2);
        
        const discountReason = getDiscountReason();
        if (discountReason) {
            showDiscountBanner(discountReason);
        } else {
            hideDiscountBanner();
        }
    }

    // Rabatt-Funktion für spezielle Tage
    function applyDiscount(price) {
        if (isSpecialDay()) {
            return price * 0.90; // 10% Rabatt
        }
        return price;
    }

    // Überprüfen, ob heute ein spezieller Tag ist
    function isSpecialDay() {
        const today = new Date();
        const specialDays = [
            '09-11', // Firmengeburtstag
            '10-21', // Abgabe-Rabatt
            '10-22', // Abgabe-Rabatt
            '10-23', // Abgabe-Rabatt
            '10-24', // Abgabe-Rabatt
            '10-25', // Abgabe-Rabatt
            '10-26', // Abgabe-Rabatt
            '10-27', // Abgabe-Rabatt
            '12-24', // Weihnachten
            '10-10', 
            // Weitere spezielle Tage hinzufügen
        ];

        const currentDateString = today.toISOString().slice(5, 10); // Monat-Tag-Format (MM-TT)
        return specialDays.includes(currentDateString);
    }

    function getDiscountReason() {
        const today = new Date();
        const currentDateString = today.toISOString().slice(5, 10); // Monat-Tag-Format (MM-TT)

        const discountReasons = {
            '09.11': 'Firmengeburtstag',
            '12-24': 'Weihnachten',
            '10-21': 'Abgabe-Rabatt',
            '10-22': 'Abgabe-Rabatt',
            '10-23': 'Abgabe-Rabatt',
            '10-24': 'Abgabe-Rabatt',
            '10-25': 'Abgabe-Rabatt',
            '10-26': 'Abgabe-Rabatt',
            '10-27': 'Abgabe-Rabatt',
            '10-10': 'Test',
            // Weitere spezielle Tage und Gründe hinzufügen
        };

        return discountReasons[currentDateString] || null;
    }

    // Rabatt-Banner anzeigen
    function showDiscountBanner(reason) {
        discountBanner.textContent = `Heute erhalten Sie 10% Rabatt auf alle Produkte wegen ${reason}!`;
        discountBanner.style.color = 'red';
        discountBanner.style.fontWeight = 'bold';
        document.body.insertBefore(discountBanner, cartContainer);
    }

    // Rabatt-Banner ausblenden
    function hideDiscountBanner() {
        if (document.body.contains(discountBanner)) {
            document.body.removeChild(discountBanner);
        }
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            const shopItem = event.target.closest('.shop-item');
            if (shopItem) {
                const name = shopItem.getAttribute('data-name');
                const price = parseFloat(shopItem.getAttribute('data-price'));
                addToCart(name, price);
            }
        });
    });
});




function toggleDetails(id) {
    var details = document.getElementById(id);
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = 'block';
    } else {
        details.style.display = 'none';
    }
}





document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.week-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const weekId = button.getAttribute('data-week');
            const content = document.getElementById(weekId);

            // Wenn der Inhalt bereits angezeigt wird, verstecke ihn.
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                // Zeige den entsprechenden Inhalt an.
                content.style.display = 'block';

                // Platziere den Inhalt nach dem aktuellen Button.
                const nextSibling = button.nextElementSibling;

                if (!nextSibling || !nextSibling.classList.contains('week-content')) {
                    // Wenn es noch kein eingefügtes week-content-Div gibt, füge es ein.
                    button.parentNode.insertBefore(content, nextSibling);
                }
            }
        });
    });
});



function openOverlay(src) {
    const overlay = document.getElementById("imageOverlay");
    const overlayImage = document.getElementById("overlayImage");

    overlayImage.src = src; // Setzt das Bild im Overlay
    overlay.style.display = "flex"; // Zeigt das Overlay an
}

function closeOverlay() {
    const overlay = document.getElementById("imageOverlay");
    overlay.style.display = "none"; // Versteckt das Overlay
    document.getElementById("overlayImage").src = ""; // Leert das Bild im Overlay
}

// Stelle sicher, dass das Overlay beim Seitenladen verborgen ist
window.onload = function () {
    const overlay = document.getElementById("imageOverlay");
    overlay.style.display = "none";
};








function initModel(containerId, modelPath, scale) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Element mit ID "${containerId}" nicht gefunden.`);
        return;
    }

    // Container als relativen Kontext verwenden
    container.style.position = 'relative';

    // Erstelle einen Wrapper für das 3D-Modell
    const modelWrapper = document.createElement('div');
    modelWrapper.style.position = 'relative';
    modelWrapper.style.width = '100%';
    modelWrapper.style.height = '100%';
    container.appendChild(modelWrapper);

    // 3D Szene aufbauen
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    modelWrapper.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;

    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const loader = new THREE.STLLoader();
    loader.load(modelPath, function (geometry) {
        const material = new THREE.MeshPhongMaterial({ color: 0x555555 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(scale, scale, scale);
        mesh.rotation.x = Math.PI / 2;
        scene.add(mesh);

        camera.position.z = 5;
        animate();

        // Dateinamen ohne .stl ermitteln
        const fileName = modelPath.split('/').pop().replace('.stl', '');

        // Erstelle ein Overlay für den Dateinamen
        const fileNameElement = document.createElement('div');
        fileNameElement.textContent = fileName;
        fileNameElement.style.position = 'absolute';
        fileNameElement.style.bottom = '10px'; // Platzierung am unteren Rand des Modells
        fileNameElement.style.left = '50%';
        fileNameElement.style.transform = 'translateX(-50%)'; // Zentrieren
        fileNameElement.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Halbtransparentes Overlay
        fileNameElement.style.color = 'white';
        fileNameElement.style.padding = '5px 10px';
        fileNameElement.style.borderRadius = '5px';
        fileNameElement.style.fontSize = '12px';
        modelWrapper.appendChild(fileNameElement); // Overlay in den Wrapper einfügen
    }, undefined, function (error) {
        console.error('Fehler beim Laden des Modells:', error);
    });

    // Funktion, um die Größe des Renderers und der Kamera anzupassen
    function resizeRenderer() {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        renderer.setSize(width, height); // Renderer auf neue Größe anpassen
        camera.aspect = width / height; // Kamera-Proportionen anpassen
        camera.updateProjectionMatrix(); // Kamera aktualisieren
    }

    // Vollbildmodus aktivieren bei Doppelklick
    container.addEventListener('dblclick', function () {
        if (!document.fullscreenElement) {
            container.requestFullscreen().catch(err => {
                console.error(`Fehler beim Aktivieren des Vollbildmodus: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // Überwachung auf Fenster- oder Fullscreen-Änderungen
    window.addEventListener('resize', resizeRenderer);
    document.addEventListener('fullscreenchange', resizeRenderer);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    animate();
}



// Jonas.html (funktioniert)
initModel('main-model1', '3D/jonas/Musikbox.stl', 0.03); 
initModel('small-model1.2', '3D/jonas/Hülle.stl', 0.05); 
initModel('small-model1.3', '3D/jonas/Griff.stl', 0.05); 
initModel('small-model1.4', '3D/jonas/Fuß.stl', 0.05); 
initModel('small-model1.5', '3D/jonas/Halter.stl', 0.05); 
initModel('small-model1.6', '3D/jonas/Spanner.stl', 0.05); 


// Noah.html
initModel('main-model2', '3D/noah/Gesamt.stl', 0.03); 
initModel('small-model2.2', '3D/noah/Grundplatte.stl', 0.05); 
initModel('small-model2.3', '3D/noah/Seiten.stl', 0.05); 
initModel('small-model2.4', '3D/noah/Glas_vorne.stl', 0.05); 
initModel('small-model2.5', '3D/noah/Glas_hinten.stl', 0.05); 
initModel('small-model2.6', '3D/noah/Füße.stl', 0.05); 
initModel('small-model2.7', '3D/noah/Deckel.stl', 0.05);
initModel('small-model2.8', '3D/noah/Halter.stl', 0.05);
initModel('small-model2.9', '3D/noah/Griff.stl', 0.05);
initModel('small-model2.10', '3D/noah/Bügel.stl', 0.05);
initModel('small-model2.11', '3D/noah/Tisch.stl', 0.05);

// Much.html
initModel('main-model3', '3D/much/Musikbox.stl', 0.02); 
initModel('small-model3.2', '3D/much/Grundplatte.stl', 0.05); 
initModel('small-model3.3', '3D/much/Seitenwand.stl', 0.05); 
initModel('small-model3.4', '3D/much/Deckel.stl', 0.05); 
initModel('small-model3.5', '3D/much/Fuß.stl', 0.05); 
initModel('small-model3.6', '3D/much/Griff.stl', 0.05); 
initModel('small-model3.7', '3D/much/Bügel.stl', 0.05);
initModel('small-model3.8', '3D/much/Tisch.stl', 0.05);
initModel('small-model3.9', '3D/much/Glas_vorne.stl', 0.05); 






