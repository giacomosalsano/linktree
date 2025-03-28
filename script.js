// Função de toggle
export function toggleMode() {
    const html = document.documentElement
    html.classList.toggle('light_mode')
}

// Função para atualizar a interface
function updateInterface(likes) {
    // Atualiza o contador
    document.getElementById('likes-count').textContent = likes;
    
    // Atualiza o coração
    const heartIcon = document.getElementById('heart-icon');
    heartIcon.className = 'fa-solid fa-heart fa-lg liked';
    
    // Desabilita o botão
    const button = document.querySelector('#like-button-div button');
    button.disabled = true;
    
    // Marca como curtido na sessão
    sessionStorage.setItem('hasLiked', 'true');
}

// Função para carregar likes
async function loadLikes() {
    try {
        const response = await fetch(`https://api.jsonbin.io/v3/b/67e6ee3d8a456b79667e8fe7/latest`, {
            headers: {
                'X-Master-Key': '$2a$10$23Oft0rvtncbSQEuk4LWtOADdg0TXJucic9fQkHgTwcM0TDjGppsC'
            }
        });
        const data = await response.json();
        const likes = data.record.likes || 0;
        
        // Atualiza apenas o número
        document.getElementById('likes-count').textContent = likes;
        
        // Se já curtiu, atualiza a interface
        if (sessionStorage.getItem('hasLiked') === 'true') {
            updateInterface(likes);
        }
    } catch (error) {
        console.error('Erro ao carregar likes:', error);
    }
}

// Função para incrementar likes
async function incrementLikes() {
    try {
        // Busca o número atual
        const response = await fetch(`https://api.jsonbin.io/v3/b/67e6ee3d8a456b79667e8fe7/latest`, {
            headers: {
                'X-Master-Key': '$2a$10$23Oft0rvtncbSQEuk4LWtOADdg0TXJucic9fQkHgTwcM0TDjGppsC'
            }
        });
        const data = await response.json();
        const newLikes = (data.record.likes || 0) + 1;
        
        // Salva o novo número
        await fetch(`https://api.jsonbin.io/v3/b/67e6ee3d8a456b79667e8fe7`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': '$2a$10$23Oft0rvtncbSQEuk4LWtOADdg0TXJucic9fQkHgTwcM0TDjGppsC'
            },
            body: JSON.stringify({ likes: newLikes })
        });
        
        // Atualiza a interface
        updateInterface(newLikes);
        
    } catch (error) {
        console.error('Erro ao incrementar likes:', error);
    }
}

// Tornando as funções globais
window.incrementLikes = incrementLikes;
window.toggleMode = toggleMode;

// Carrega os likes ao iniciar
document.addEventListener('DOMContentLoaded', loadLikes);


