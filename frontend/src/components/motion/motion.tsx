import {
    Box,
    Flex,
    Heading,
    HeadingProps,
    HTMLChakraProps
  } from "@chakra-ui/react";
  import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";
  import React, { useEffect, useRef } from "react";
  
  type Merge<P, T> = Omit<P, keyof T> & T;
  type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;
  type MotionHeaderProps = Merge<HeadingProps, HTMLMotionProps<"header">>;
  
  export const MotionFlex: React.FC<MotionBoxProps> = motion(Flex);
  export const MotionBox: React.FC<MotionBoxProps> = motion(Box);
  export const MotionHeader: React.FC<MotionHeaderProps> = motion(Heading);
  
  export interface MotionTextProps {
    text: string;
    type?: "rotate" | "slide";
    direction?: "forward" | "backward";
  }
  
  export function MotionText({
    text,
    type = "slide",
    direction = "forward"
  }: MotionTextProps) {
    const isFirst = useRef(true);
    const animate: { [key: string]: any } = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    };
  
    if (type === "rotate") {
      animate.initial.rotate = direction === "forward" ? -90 : 90;
      animate.animate.rotate = 0;
      animate.exit.rotate = direction === "forward" ? 90 : -90;
    } else {
      animate.initial.y = direction === "forward" ? "100%" : "-100%";
      animate.animate.y = 0;
      animate.exit.y = direction === "forward" ? "-100%" : "100%";
    }
  
    if (isFirst.current) {
      delete animate.initial;
    }
  
    useEffect(() => {
      isFirst.current = false;
    }, [text]);
  
    return (
      <Box position="relative">
        <span style={{ visibility: "hidden" }}>{text}</span>
        <AnimatePresence>
          <MotionBox
            key={text}
            position="absolute"
            top="0"
            left="0"
            transformOrigin="bottom left"
            transition={{ type: "tween" }}
            {...animate}
          >
            {text}
          </MotionBox>
        </AnimatePresence>
      </Box>
    );
  }
  