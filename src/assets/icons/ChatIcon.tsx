import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
    size?: number;
    color?: string;
}

const ChatIcon: React.FC<IconProps> = ({ size = 24, color = '#FFFFFF' }) => {
    return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            {/* Replace with your SVG path data */}
            <Path
                d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"
                fill={color}
            />
        </Svg>
    );
};

export default ChatIcon;
