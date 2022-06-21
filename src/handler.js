//import {nanoid} from 'nanoid'
const {nanoid} = require('nanoid')
//import * as notes from './notes.js'
const notes = require('./notes')

const addNoteHandler = (req, h) => {
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
};

    const getAllNotesHandler = () => ({
        status: 'succes',
        data: {
            notes,
        },
    });
//export {addNoteHandler, getAllNotesHandler};