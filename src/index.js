//'use strict';
//import Hapi from '@hapi/hapi';
const Hapi = require ('@hapi/hapi');
//import * as routes from './routes.js';
// const routes = require ('./routes.js')
// const handler = require('./handler')
// const notes = require('./notes')
let notes = [];
const {nanoid} = require('nanoid')


const init = async () => {
    const server = Hapi.server({
        port: 8000,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    //server.route(routes);

    server.route([
        {
            method: 'POST',
            path: '/notes',
            handler: (req, h) => {
                const {title, tags, body} = req.payload;
            
                const id = nanoid(16);
                const createAt = new Date().toISOString();
                const updateAt = createAt;
            
                const newNote = {
                    title, tags, body, id, createAt, updateAt,
                };
            
                notes.push(newNote);
            
                const isSuccess = notes.filter((note) => note.id === id).length > 0;
            
                if(isSuccess) {
                    const response = h.response({
                        status: 'Success',
                        message: 'Catatan berhasil ditambahkan',
                        data: {
                            noteId: id,
                        },
                    });
                    response.code(201);
                    return response;
                }
                const response = h.response({
                    status: 'fail',
                    message: 'Catatan gagal ditambahkan',
                });
                response.code(500);
                return response;
            },
        },
        {
            method: 'GET',
            path: '/notes',
            handler: () => ({
            
                    status: 'succes',
                    data: {
                        notes,
                    }
        })},
        {
            method: 'PUT',
            path: '/notes/{id}',
            handler: (req, h) => {
                const {id} = req.params;

                const {title, tags, body} = req.payload;
                const updateAt = new Date().toISOString();

                const index = notes.findIndex((note) => note.id === id);

                if (index !== -1){
                    notes[index] = {
                        ...notes[index],
                        title,
                        tags,
                        body,
                        updateAt,
                    };
                    const response = h.response({
                        status: 'success',
                        message: 'Catatan berhasil diperbarui'
                    });
                    response.code(200);
                    return response;
                }

                const response = h.response({
                    status: 'fail',
                    message: 'Gagal memperbarui catatan, Id tidak ditemukan'
                });
                response.code(404);
                return response;
            }
        },
        {
            method: 'DELETE',
            path: '/notes/{id}',
            handler: (req, h) => {
                const {id} = req.params;

                const index = notes.findIndex((note) => note.id === id);

                if(index !== -1){
                    notes.splice(index, 1);
                    const response = h.response({
                        status: 'success',
                        message: 'Catatan berhasil dihapus',
                    });
                    response.code(200);
                    return response;
                }
                const response = h.response({
                    status: 'fail',
                    message: 'Catatan gagal dihapus, Id tidak ditemukan',
                });
            }
        }
    ]);

    await server.start();
    console.log(`Server sedang berjalan pada ${server.info.uri}`);
};

init();