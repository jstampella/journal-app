import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { fileUpload, loadNotes } from "../../helpers";
import { setNotes, setSaving, updateNote, setPhotoToActiveNote } from "./";
import {
  deleteNoteById,
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
} from "./";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote());

    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      imageUrls: [],
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    //dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe.");
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());
    const { uid } = getState().auth;
    const { active: note } = getState().journal;
    const noteTofireStore = { ...note };
    delete noteTofireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteTofireStore, { merge: true });
    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photoUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotoToActiveNote(photoUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);
    dispatch(deleteNoteById(note.id));
  };
};
