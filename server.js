const Hapi = require('@hapi/hapi');

const predictionHandler = async (request, h) => {
    try {
        // Validasi ukuran file gambar
        if (!request.payload || !request.payload.image || request.payload.image.bytes > 1000000) {
            return h.response({
                status: 'fail',
                message: 'Payload content length greater than maximum allowed: 1000000'
            }).code(413);
        }

        // Lakukan prediksi menggunakan model machine learning
        const result = await predict(request.payload.image);

        // Jika prediksi berhasil
        if (result.success) {
            return {
                status: 'success',
                message: 'Model is predicted successfully',
                data: {
                    id: result.id,
                    result: result.result,
                    suggestion: result.suggestion,
                    createdAt: new Date().toISOString()
                }
            };
        } else {
            // Jika terjadi kesalahan dalam prediksi
            return h.response({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi'
            }).code(400);
        }
    } catch (error) {
        console.error('Error:', error);
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi'
        }).code(400);
    }
};

const predict = async (image) => {
    // Lakukan proses prediksi di sini
    // Misalnya, panggil model machine learning dan kembalikan hasil prediksi
    // Dummy implementation
    return {
        success: true,
        id: '77bd90fc-c126-4ceb-828d-f048dddff746',
        result: 'Cancer',
        suggestion: 'Segera periksa ke dokter!'
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
            handler: predictionHandler,
            options: {
                payload: {
                    maxBytes: 1000000, // Maksimum 1MB
                    output: 'stream',
                    parse: true,
                    multipart: true
                }
            }
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
