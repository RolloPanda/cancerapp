// D:/submission/dicoding/ML/server/server.js
const Hapi = require('@hapi/hapi');

const predictionHandler = async (request, h) => {
    // Logic untuk menangani prediksi model machine learning
    // Anda dapat mengakses data payload dari request.payload
    // Lakukan validasi ukuran file dan proses prediksi
    // Kemudian kembalikan respons sesuai format yang diminta
    // Contoh:
    return {
        status: 'success',
        message: 'Model is predicted successfully',
        data: {
            id: '77bd90fc-c126-4ceb-828d-f048dddff746',
            result: 'Cancer',
            suggestion: 'Segera periksa ke dokter!',
            createdAt: new Date().toISOString()
        }
    };
};

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    const routes = [
        {
            method: 'POST',
            path: '/predict',
            handler: predictionHandler
        }
    ];

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error('Unhandled rejection:', err);
    process.exit(1);
});

init();
