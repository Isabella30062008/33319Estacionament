
document.getElementById('carForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const API_POST_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/entry';


    const model = document.getElementById('model').value;
    const plate = document.getElementById('plate').value;

    const carro = {
        modelo: model,
        placa: plate,
    };

    fetch( API_POST_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plate: plate, model: model })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').textContent = 'Carro registrado!';
    })
    .catch(error => {
        document.getElementById('resultado').textContent = 'Erro ao registrar carro.';
        console.error('Erro:', error);
    });
});

// GET – Consultar tempo de permanência

const API_GET_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/time/';

document.getElementById('tempoForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const tempoPlate = document.getElementById('tempoPlate').value;

    fetch(API_GET_URL + tempoPlate)
        .then(response => {
            if (!response.ok) {
                throw new Error('Placa não encontrada ou erro na requisição.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta da API:', data); 
            document.getElementById('tempo').textContent = `Tempo de permanência: ${data.parkedTime.toFixed(2)}`;
        })
        .catch(error => {
            document.getElementById('tempo').textContent = 'Erro ao consultar tempo de permanência.';
            console.error('Erro:', error);
        });
});


// GET - Verificar carro

const API_CHECK_URL = 'http://cnms-parking-api.net.uztec.com.br/api/v1/check/';

document.getElementById('checkForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const checkPlate = document.getElementById('checkPlate').value;

    fetch(API_CHECK_URL + checkPlate)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao verificar placa.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data); // Para debug
            const estaEstacionado = data.entryTime ? 'SIM' : 'NÃO';
            document.getElementById('checkResultado').textContent = `Está no estacionamento? ${estaEstacionado}`;
        })
        .catch(error => {
            document.getElementById('checkResultado').textContent = 'Erro ao verificar veículo.';
            console.error('Erro:', error);
        });
});

