// ============================================
// Image Upload Module
// ============================================

const ImageUpload = {
  uploadedImageData: null,

  init() {
    this.setupUploadZone();
    this.setupClipboardPaste();
    this.setupButtons();
  },

  setupUploadZone() {
    const zone      = document.getElementById('uploadZone');
    const fileInput = document.getElementById('fileInput');
    if (!zone || !fileInput) return;

    // Click anywhere on zone to open file picker
    zone.addEventListener('click', (e) => {
      if (e.target !== fileInput) fileInput.click();
    });

    // File selected via picker
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) this.handleFile(file);
      fileInput.value = ''; // reset so same file can be re-selected
    });

    // Drag over
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      zone.classList.add('dragover');
    });

    // Drag leave
    zone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      e.stopPropagation();
      zone.classList.remove('dragover');
    });

    // Drop
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      zone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        this.handleFile(file);
      } else {
        API.showToast('Please drop a valid image file (JPG, PNG, WebP, BMP)', 'error');
      }
    });
  },

  setupClipboardPaste() {
    document.addEventListener('paste', (e) => {
      // Only act when upload tab is active
      if (!document.getElementById('uploadTab')?.classList.contains('active')) return;
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            this.handleFile(file);
            API.showToast('Image pasted from clipboard!', 'success');
          }
          break;
        }
      }
    });
  },

  setupButtons() {
    // Remove button
    document.getElementById('removeImage')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.removeImage();
    });
    // Change image button
    document.getElementById('changeImageBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('fileInput')?.click();
    });
  },

  handleFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/bmp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      API.showToast('Unsupported format. Use JPG, PNG, WebP, or BMP.', 'error');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      API.showToast('File too large. Maximum size is 15MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.uploadedImageData = e.target.result;
      this.showPreview(e.target.result, file.name);
    };
    reader.onerror = () => API.showToast('Failed to read the image file. Please try again.', 'error');
    reader.readAsDataURL(file);
  },

  showPreview(dataUrl, filename) {
    const uploadZone      = document.getElementById('uploadZone');
    const previewContainer = document.getElementById('imagePreview');
    const previewImage    = document.getElementById('previewImage');

    if (uploadZone)       uploadZone.style.display = 'none';
    if (previewContainer) previewContainer.classList.add('active');
    if (previewImage)     previewImage.src = dataUrl;

    API.showToast(filename ? `Loaded: ${filename}` : 'Image loaded!', 'success');
  },

  removeImage() {
    this.uploadedImageData = null;
    const uploadZone       = document.getElementById('uploadZone');
    const previewContainer = document.getElementById('imagePreview');

    if (uploadZone)       uploadZone.style.display = 'flex';
    if (previewContainer) previewContainer.classList.remove('active');

    // Reset results
    const resultEmpty   = document.getElementById('resultEmpty');
    const resultContent = document.getElementById('resultContent');
    if (resultEmpty) {
      resultEmpty.style.display = 'flex';
      resultEmpty.innerHTML = `
        <div class="empty-icon">📝</div>
        <p>Draw or upload an image, then click<br><strong>"Recognize Handwriting"</strong></p>
      `;
    }
    if (resultContent) resultContent.style.display = 'none';

    API.showToast('Image removed', 'info');
  },

  getImageData() {
    return this.uploadedImageData;
  },
};

document.addEventListener('DOMContentLoaded', () => ImageUpload.init());
