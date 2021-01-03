import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { OutputOption } from "./types";
import OptionButton from "./components/OptionButton";
import Paper from "./components/Paper";
import Button from "./components/Button";
import TextInput from "./components/TextInput";
import Section from "./components/Section";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Info from "./components/Info";
import Progress from "./components/Progress";
import { Small, Medium, Large, AcceptedFileTypes } from "./config";
import { resizeAndArchive } from "./utils";

import "./App.css";

function App() {
  // App states
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<OutputOption[]>([]);
  const [customSize, setCustomSize] = useState<string>("");
  const [showInfo, setShowInfo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);

  const handleOnDrop = useCallback(async (acceptedFiles: File[]) => {
    const haveAcceptedFileType = acceptedFiles.filter((f) =>
      AcceptedFileTypes.includes(f.type)
    );
    setFiles((files) => [...files, ...haveAcceptedFileType]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleOnDrop,
  });

  const handleProgress = (percent: number) => {
    setProgress(percent);
  };

  const handleResize = async () => {
    if (files.length && options.length) {
      setRunning(true);
      try {
        await resizeAndArchive(files, options, handleProgress);
      } catch (error) {
        console.error("Error in handle resize", error);
      } finally {
        setRunning(false);
        setProgress(0);
      }
    }
  };

  const handleOptionChanged = (selected: boolean, option: OutputOption) => {
    if (selected) {
      setOptions((o) => [...o, option]);
    } else {
      setOptions((o) => o.filter((i) => i.maxSize !== option.maxSize));
    }
  };

  const handleReset = () => {
    setFiles([]);
  };

  const handleCustomSizeChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const sizeInput = event.target.value;
    const size = (sizeInput.match("[0-9]*") || []).join("");
    setCustomSize(size);
    setOptions((old) => {
      const updated = old.filter((o) => !o.custom);
      updated.push({
        custom: true,
        fileNameSiffix: `_${size}`,
        maxSize: parseInt(size),
      });
      return updated;
    });
  };

  return (
    <div className="App-content">
      <Paper>
        {running && <Progress percent={progress} />}
        <Info show={showInfo} onClose={() => setShowInfo(false)} />
        <header>
          <Header count={files.length} onReset={handleReset} />
        </header>
        <section>
          <h1 className="App-h1">Image batch resize</h1>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className="App-info">
              <div>
                <Button size="wide" color="primary" text="Select images" />
              </div>
              {isDragActive ? <p>Drop!</p> : <p>or drop them here...</p>}
            </div>
          </div>
          <Section title="Sizes">
            <div className="InlineGroup App-space-buttons">
              <OptionButton
                onChange={handleOptionChanged}
                option={Small}
                text="Small"
              />
              <OptionButton
                onChange={handleOptionChanged}
                option={Medium}
                text="Medium"
              />
              <OptionButton
                onChange={handleOptionChanged}
                option={Large}
                text="Large"
              />
              <TextInput
                onChange={handleCustomSizeChanged}
                value={customSize}
                color="secondary"
              />
            </div>
          </Section>
          <div className="App-submit">
            <Button
              text="Resize"
              size="wide"
              disabled={running}
              variant="solid"
              onClick={handleResize}
              color="primary"
            />
          </div>
        </section>
        <footer>
          <Footer onShowInfo={() => setShowInfo(true)} />
        </footer>
      </Paper>
    </div>
  );
}

export default App;
