import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { FileBrowser, FileContextMenu, FileHelper, FileList, FileNavbar, FileToolbar, FullFileBrowser } from 'chonky'
import {getBlob, listAll, ref} from 'firebase/storage'
import { storage } from './lib/firebase'
import { useEffect } from 'react'
import { ChonkyActions } from 'chonky'
import { useMemo } from 'react'
import { useCallback } from 'react'

export const listFiles = (currentFolder) => {
  return useMemo(() => {
    const listRef = ref(storage,currentFolder) 
    listAll(listRef)
    .then((res) => {
      const folders = res.prefixes.map(f => ({id: f.name, name: f.name, isDir: true}))
      const files = res.items.map((i) => ({id: i.name, name: i.name, }))
      const allList = folders.concat(files)
      return allList
    })
    
  },[currentFolder])
}

function App() {
  const [currentFolder, setCurrentFolder] = useState("");
  const [chainFolder, setChainFolder] = useState([]);
  const [list, setList] = useState([]);
  const fileActions = [
    ChonkyActions.CreateFolder,
    ChonkyActions.OpenSelection,
    ChonkyActions.DeleteFiles
  ]
  useEffect(() => {
    const listRef = ref(storage,currentFolder)
    const folderChain = listRef.fullPath.split("/").map((f) => ({
      id: f,
      name: f
    }))
    setChainFolder(folderChain)
    listAll(listRef)
    .then((res) => {
      const folders = res.prefixes.map(f => ({id: f.fullPath, name: f.name, isDir: true}))
      const files = res.items.map((i) => ({id: i.fullPath, name: i.name, }))
      const allList = folders.concat(files)
      setList(allList)
    })
  }, [currentFolder]);

  const useFileActionHandler = (
    setCurrentFolder
) => {
    return useCallback(
        (data) => {
            if (data.id === ChonkyActions.OpenFiles.id) {
                const { targetFile, files } = data.payload;
                const fileToOpen = targetFile ?? files[0];
                if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                    setCurrentFolder(fileToOpen.id);
                    return;
                }
                if (fileToOpen && !FileHelper.isDirectory(fileToOpen)) {
                  const fileRef = ref(storage,fileToOpen.id)
                  getBlob(fileRef)
                  .then((blob) => console.log(blob.toString())) 
                  return
                }
            }

            console.log(data);
        },
        [setCurrentFolder]
    );
};

const fileAction = useFileActionHandler(setCurrentFolder)
  return (
    <>
      <div className='container'>
        <FileBrowser folderChain={chainFolder} files={list} fileActions={fileActions} disableDefaultFileActions onFileAction={fileAction}>
            <FileNavbar />
            <FileToolbar />
            <FileList />
            <FileContextMenu />
        </FileBrowser>
       </div>
    </>
  )
}

export default App
