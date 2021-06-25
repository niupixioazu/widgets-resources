/**
 * This file was generated from VideoPlayer.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { CSSProperties } from "react";
import { DynamicValue } from "mendix";

export type WidthUnitEnum = "percentage" | "pixels";

export type HeightUnitEnum = "aspectRatio" | "percentageOfParent" | "percentageOfWidth" | "pixels";

export type HeightAspectRatioEnum = "oneByOne" | "fourByThree" | "threeByTwo" | "sixteenByNine" | "TwentyOneByNine";

export interface VideoPlayerContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    urlExpression: DynamicValue<string>;
    posterExpression?: DynamicValue<string>;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    widthUnit: WidthUnitEnum;
    width: number;
    heightUnit: HeightUnitEnum;
    heightAspectRatio: HeightAspectRatioEnum;
    height: number;
}

export interface VideoPlayerPreviewProps {
    class: string;
    style: string;
    urlExpression: string;
    posterExpression: string;
    autoStart: boolean;
    showControls: boolean;
    muted: boolean;
    loop: boolean;
    widthUnit: WidthUnitEnum;
    width: number | null;
    heightUnit: HeightUnitEnum;
    heightAspectRatio: HeightAspectRatioEnum;
    height: number | null;
}
