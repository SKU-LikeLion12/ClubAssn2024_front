import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagePuzzle from './ManagePuzzle';
import EditPuzzle from './EditPuzzle';
import AddPuzzle from './AddPuzzle';

const PuzzlePieceManagement = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagePuzzle/>}/>
      <Route path="/editPuzzle" element={<EditPuzzle/>}/>
      <Route path="/addPuzzle" element={<AddPuzzle/>}/>
    </Routes>
  );
};

export default PuzzlePieceManagement;