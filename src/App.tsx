import { FC, useRef, useState } from 'react';
import {
  Excalidraw,
  exportToBlob,
  exportToCanvas,
  Sidebar,
} from '@excalidraw/excalidraw';

import './style.css';
// import { ExcalidrawProps } from '@excalidraw/excalidraw/types/types';

// type ExcalidrawImperativeAPI = Parameters<ExcalidrawProps['excalidrawAPI']>[0];

const initialData: any = {
  appState: { zenModeEnabled: true, viewBackgroundColor: '#fafafa' },
  scrollToContent: true,
};

export const App: FC<{ name: string }> = ({ name }) => {
  // const excalidraw = useRef<ExcalidrawImperativeAPI>();
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [canvasUrl, setCanvasUrl] = useState<string>('');
  const [docked, setDocked] = useState(false);
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Excalidraw Example</h1>
      <button
        onClick={async () => {
          if (!excalidrawAPI) return;
          const elements = excalidrawAPI.getSceneElements();
          if (!elements || !elements.length) {
            return;
          }
          const canvas = await exportToBlob({
            elements,
            appState: {
              ...initialData.appState,
              exportWithDarkMode: false,
            },
            files: excalidrawAPI.getFiles(),
            mimeType: 'image/jpeg',
            quality: 1,
          });
          const a = document.createElement('a');
          setCanvasUrl(URL.createObjectURL(canvas));
        }}
      >
        Export to Canvas
      </button>
      <div style={{ height: '500px' }}>
        <Excalidraw
          name={'hellooooo'}
          UIOptions={{
            tools: {
              image: false,
            },
            canvasActions: {
              saveAsImage: false,
              changeViewBackgroundColor: false,
            },
          }}
          excalidrawAPI={setExcalidrawAPI}
          initialData={initialData}
          onChange={(data) => {
            console.log(data);
          }}
        >
          <Sidebar name="custom" docked={docked} onDock={setDocked}>
            <Sidebar.Header />
            <Sidebar.Tabs style={{ padding: '0.5rem' }}>
              <Sidebar.Tab tab="one">Tab one!</Sidebar.Tab>
              <Sidebar.Tab tab="two">Tab two!</Sidebar.Tab>
              <Sidebar.TabTriggers>
                <Sidebar.TabTrigger tab="one">One</Sidebar.TabTrigger>
                <Sidebar.TabTrigger tab="two">Two</Sidebar.TabTrigger>
              </Sidebar.TabTriggers>
            </Sidebar.Tabs>
          </Sidebar>
        </Excalidraw>
        <img src={canvasUrl} alt="" /