import React, { useState, useEffect, useRef } from 'react';

interface ScreenComponentProps {
    headerText?: string;
    initialPosition?: { x: number; y: number };
    initialSize?: { width: number; height: number };
    content?: string;
    headerColor?: string;
}

const ScreenComponent: React.FC<ScreenComponentProps> = ({
                                                             headerText = 'Screen Header',
                                                             initialPosition = { x: 100, y: 100 },
                                                             initialSize = { width: 300, height: 200 },
                                                             content = 'This is the content of the screen.',
                                                             headerColor = '#4CAF50',
                                                         }) => {
    // State variables for position, size, dragging and resizing
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [resizeOffsetX, setResizeOffsetX] = useState(0);
    const [resizeOffsetY, setResizeOffsetY] = useState(0);

    const minWidth = 200;
    const minHeight = 150;
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    // Refs for the element
    const screenRef = useRef<HTMLDivElement>(null);

    const startDrag = (event: React.MouseEvent) => {
        if (event.target instanceof HTMLElement && event.target.classList.contains('header')) {
            setDragging(true);
            setOffsetX(event.clientX - position.x);
            setOffsetY(event.clientY - position.y);
        }
    };

    const startResize = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent text selection while resizing
        setResizing(true);
        setResizeOffsetX(event.clientX - size.width);
        setResizeOffsetY(event.clientY - size.height);
    };

    const onMouseMove = (event: MouseEvent) => {
        if (dragging) {
            let newX = event.clientX - offsetX;
            let newY = event.clientY - offsetY;

            // Prevent dragging out of bounds (constraints)
            newX = Math.max(0, Math.min(newX, maxWidth - size.width));
            newY = Math.max(0, Math.min(newY, maxHeight - size.height));

            setPosition({ x: newX, y: newY });
        }

        if (resizing) {
            let newWidth = event.clientX - resizeOffsetX;
            let newHeight = event.clientY - resizeOffsetY;

            // Ensure the width and height are not less than the minimum size
            newWidth = Math.max(minWidth, newWidth);
            newHeight = Math.max(minHeight, newHeight);

            // Prevent resizing beyond maximum size
            newWidth = Math.min(newWidth, maxWidth - position.x);
            newHeight = Math.min(newHeight, maxHeight - position.y);

            setSize({ width: newWidth, height: newHeight });
        }
    };

    const stopDrag = () => {
        setDragging(false);
    };

    const stopResize = () => {
        setResizing(false);
    };

    const resetPosition = () => {
        setPosition(initialPosition);
        setSize(initialSize);
    };

    // Add mousemove and mouseup event listeners when dragging or resizing
    useEffect(() => {
        if (dragging || resizing) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', () => {
                stopDrag();
                stopResize();
            });
        }
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', () => {
                stopDrag();
                stopResize();
            });
        };
    }, [dragging, resizing]);

    return (
        <div
            className="screen"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
            }}
            ref={screenRef}
        >
            <div
                className="header"
                style={{ backgroundColor: headerColor }}
                onMouseDown={startDrag}
            >
                {headerText}
            </div>
            <div className="content">
                <p>{content}</p>
            </div>

            {/* Resize Handle */}
            <div
                className="resize-handle"
                onMouseDown={startResize}
                style={{ cursor: 'se-resize' }}
            ></div>

            {/* Reset Button */}
            <button onClick={resetPosition} className="reset-btn">
                Reset
            </button>
        </div>
    );
};

export default ScreenComponent;
