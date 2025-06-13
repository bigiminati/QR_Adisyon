import React, { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

export default function QrReader({ onDecode }) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: 250 });
    scanner.render(text => {
      onDecode(text);
      scanner.clear();
    });
    return () => scanner.clear();
  }, [onDecode]);

  return <div id="reader" style={{ width: '100%' }} />;
}
