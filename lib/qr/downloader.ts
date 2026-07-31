import { jsPDF } from 'jspdf';
import { QRDesignOptions } from './types';

/**
 * Creates a framed canvas combining the raw QR canvas and user's selected frame design.
 */
export function createFramedCanvas(
  sourceCanvas: HTMLCanvasElement,
  design: QRDesignOptions
): HTMLCanvasElement {
  if (design.frameTemplate === 'none') {
    return sourceCanvas;
  }

  const padding = Math.round(sourceCanvas.width * 0.12);
  const textHeight = Math.round(sourceCanvas.width * 0.18);
  const totalWidth = sourceCanvas.width + padding * 2;
  const totalHeight = sourceCanvas.height + padding * 2 + textHeight;

  const framedCanvas = document.createElement('canvas');
  framedCanvas.width = totalWidth;
  framedCanvas.height = totalHeight;
  const ctx = framedCanvas.getContext('2d');
  if (!ctx) return sourceCanvas;

  // Background
  ctx.fillStyle = design.transparentBg ? 'transparent' : design.bgColor || '#ffffff';
  if (!design.transparentBg) {
    ctx.fillRect(0, 0, totalWidth, totalHeight);
  }

  // Draw Frame Container
  ctx.fillStyle = design.frameColor || '#0f172a';
  const radius = Math.round(totalWidth * 0.05);

  if (design.frameTemplate === 'scan-me' || design.frameTemplate === 'bottom-bar') {
    // Outer Border
    ctx.lineWidth = Math.round(totalWidth * 0.02);
    ctx.strokeStyle = design.frameColor || '#0f172a';
    ctx.beginPath();
    ctx.roundRect(
      padding / 2,
      padding / 2,
      totalWidth - padding,
      totalHeight - padding,
      radius
    );
    ctx.stroke();

    // Bottom Pill / Bar
    const barHeight = Math.round(textHeight * 0.85);
    const barY = totalHeight - padding / 2 - barHeight;
    ctx.fillStyle = design.frameColor || '#0f172a';
    ctx.beginPath();
    ctx.roundRect(
      padding,
      barY,
      totalWidth - padding * 2,
      barHeight,
      Math.round(barHeight / 2)
    );
    ctx.fill();

    // Text inside Pill
    ctx.fillStyle = design.frameTextColor || '#ffffff';
    const fontSize = Math.round(barHeight * 0.45);
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      (design.frameText || 'SCAN ME').toUpperCase(),
      totalWidth / 2,
      barY + barHeight / 2
    );
  } else if (design.frameTemplate === 'tech-card') {
    // Card Fill
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.15)';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.roundRect(10, 10, totalWidth - 20, totalHeight - 20, radius);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Header Bar
    ctx.fillStyle = design.frameColor || '#0f172a';
    ctx.beginPath();
    ctx.roundRect(10, 10, totalWidth - 20, Math.round(textHeight * 0.7), [
      radius,
      radius,
      0,
      0,
    ]);
    ctx.fill();

    // Header Text
    ctx.fillStyle = design.frameTextColor || '#ffffff';
    const fontSize = Math.round(textHeight * 0.35);
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      (design.frameText || 'SCAN ME').toUpperCase(),
      totalWidth / 2,
      10 + (textHeight * 0.7) / 2
    );
  }

  // Draw QR Image in Center
  const qrX = padding;
  const qrY = design.frameTemplate === 'tech-card' ? padding + Math.round(textHeight * 0.4) : padding;
  ctx.drawImage(sourceCanvas, qrX, qrY, sourceCanvas.width, sourceCanvas.height);

  return framedCanvas;
}

export function downloadCanvasAsPNG(canvas: HTMLCanvasElement, filename: string = 'wdbloog-qrcode.png') {
  const link = document.createElement('a');
  link.download = filename;
  link.href = canvas.toDataURL('image/png', 1.0);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadCanvasAsPDF(
  canvas: HTMLCanvasElement,
  title: string = 'WDBloog QR Code',
  filename: string = 'wdbloog-qrcode.pdf'
) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgData = canvas.toDataURL('image/png', 1.0);

  // Add Header Branding
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42);
  doc.text('WDBloog QR Code Generator', 105, 25, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139);
  doc.text(title, 105, 33, { align: 'center' });

  // Add QR Code Image centered
  const qrWidth = 120; // 120mm
  const qrHeight = (canvas.height / canvas.width) * qrWidth;
  doc.addImage(imgData, 'PNG', (210 - qrWidth) / 2, 50, qrWidth, qrHeight);

  // Footer / Instructions
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text('Generated via qr.wdbloog.com - High Quality Printable Vector Output', 105, 280, {
    align: 'center',
  });

  doc.save(filename);
}

export async function copyCanvasToClipboard(canvas: HTMLCanvasElement): Promise<boolean> {
  try {
    return await new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          resolve(false);
          return;
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({
              [blob.type]: blob,
            }),
          ]);
          resolve(true);
        } catch {
          resolve(false);
        }
      }, 'image/png');
    });
  } catch {
    return false;
  }
}

export function printCanvas(canvas: HTMLCanvasElement, title: string = 'QR Code') {
  const dataUrl = canvas.toDataURL('image/png');
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print ${title} - WDBloog QR Code</title>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            background: #fff;
            color: #0f172a;
          }
          .card {
            text-align: center;
            padding: 30px;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            max-width: 400px;
          }
          img {
            max-width: 320px;
            height: auto;
            margin: 20px 0;
          }
          h1 { font-size: 20px; margin: 0 0 8px 0; }
          p { font-size: 14px; color: #64748b; margin: 0; }
          .footer { margin-top: 20px; font-size: 12px; color: #94a3b8; }
          @media print {
            body { padding: 0; }
            .card { border: none; }
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>${title}</h1>
          <p>Scan with any smartphone camera</p>
          <img src="${dataUrl}" alt="QR Code" />
          <div class="footer">Generated by qr.wdbloog.com</div>
        </div>
        <script>
          window.onload = function() {
            window.print();
            setTimeout(function() { window.close(); }, 500);
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
}
