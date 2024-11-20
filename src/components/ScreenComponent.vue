<template>
  <div
      class="screen"
      :style="{ left: `${position.x}px`, top: `${position.y}px`, width: `${size.width}px`, height: `${size.height}px` }"
  >
    <div class="header" :style="{ backgroundColor: headerColor }" @mousedown="startDrag">{{ headerText }}</div>
    <div class="content">
      <p>{{ content }}</p>
    </div>

    <!-- Resize Handle -->
    <div class="resize-handle" @mousedown="startResize"></div>

    <!-- Reset Button -->
    <button @click="resetPosition" class="reset-btn">Reset</button>
  </div>
</template>

<script>
export default {
  props: {
    headerText: {
      type: String,
      default: 'Screen Header', // Default value for header text
    },
    initialPosition: {
      type: Object,
      default: () => ({ x: 100, y: 100 }), // Default initial position
    },
    initialSize: {
      type: Object,
      default: () => ({ width: 300, height: 200 }), // Default initial size
    },
    content: {
      type: String,
      default: 'This is the content of the screen.', // Default content text
    },
    headerColor: {
      type: String,
      default: '#4CAF50', // Default header color
    },
  },
  data() {
    return {
      position: { ...this.initialPosition }, // Position set from prop
      size: { ...this.initialSize }, // Size set from prop
      dragging: false,
      resizing: false,
      offsetX: 0,
      offsetY: 0,
      resizeOffsetX: 0,
      resizeOffsetY: 0,
      minWidth: 200, // Minimum width of the screen component
      minHeight: 150, // Minimum height of the screen component
      maxWidth: window.innerWidth, // Maximum width constraint
      maxHeight: window.innerHeight, // Maximum height constraint
    };
  },
  methods: {
    // Start dragging the component (moving it)
    startDrag(event) {
      if (event.target.classList.contains('header')) {
        this.dragging = true;
        this.offsetX = event.clientX - this.position.x;
        this.offsetY = event.clientY - this.position.y;
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.stopDrag);
      }
    },

    // Start resizing the component (resize the width and height)
    startResize(event) {
      event.preventDefault(); // Prevent text selection while resizing
      this.resizing = true;
      this.resizeOffsetX = event.clientX - this.size.width;
      this.resizeOffsetY = event.clientY - this.size.height;
      document.addEventListener('mousemove', this.onResize);
      document.addEventListener('mouseup', this.stopResize);
    },

    // Move the component when dragging
    onMouseMove(event) {
      if (this.dragging) {
        let newX = event.clientX - this.offsetX;
        let newY = event.clientY - this.offsetY;

        // Prevent dragging out of bounds (constraints)
        newX = Math.max(0, Math.min(newX, this.maxWidth - this.size.width));
        newY = Math.max(0, Math.min(newY, this.maxHeight - this.size.height));

        this.position.x = newX;
        this.position.y = newY;
      }
    },

    // Resize the component when dragging the resize handle
    onResize(event) {
      if (this.resizing) {
        let newWidth = event.clientX - this.resizeOffsetX;
        let newHeight = event.clientY - this.resizeOffsetY;

        // Ensure the width and height are not less than the minimum size
        newWidth = Math.max(this.minWidth, newWidth);
        newHeight = Math.max(this.minHeight, newHeight);

        // Prevent resizing beyond maximum size
        newWidth = Math.min(newWidth, this.maxWidth - this.position.x);
        newHeight = Math.min(newHeight, this.maxHeight - this.position.y);

        this.size.width = newWidth;
        this.size.height = newHeight;
      }
    },

    // Stop dragging the component
    stopDrag() {
      this.dragging = false;
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.stopDrag);
    },

    // Stop resizing the component
    stopResize() {
      this.resizing = false;
      document.removeEventListener('mousemove', this.onResize);
      document.removeEventListener('mouseup', this.stopResize);
    },

    // Reset position and size to initial values
    resetPosition() {
      this.position = { ...this.initialPosition };
      this.size = { ...this.initialSize };
    },
  },
};
</script>

<style scoped>
.screen {
  position: absolute;
  background-color: #ffffff;
  border: 2px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header {
  color: white;
  padding: 10px;
  cursor: move;
  text-align: center;
}

.content {
  padding: 10px;
  overflow: auto;
}

.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background-color: #2196F3;
  cursor: se-resize; /* Diagonal resize cursor */
}

.reset-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #FF5722;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
}
</style>
