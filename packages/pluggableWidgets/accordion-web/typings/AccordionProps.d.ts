/**
 * This file was generated from Accordion.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix UI Content Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { DynamicValue, WebIcon } from "mendix";

export type HeaderRenderModeEnum = "text" | "custom";

export type HeaderHeadingEnum = "headingOne" | "headingTwo" | "headingThree" | "headingFour" | "headingFive" | "headingSix";

export type InitialCollapsedStateEnum = "expanded" | "collapsed";

export interface GroupsType {
    headerRenderMode: HeaderRenderModeEnum;
    headerText: DynamicValue<string>;
    headerHeading: HeaderHeadingEnum;
    headerContent?: ReactNode;
    content?: ReactNode;
    initialCollapsedState: InitialCollapsedStateEnum;
    visible: DynamicValue<boolean>;
    dynamicClass?: DynamicValue<string>;
}

export type ExpandBehaviorEnum = "singleExpanded" | "multipleExpanded";

export type ShowIconEnum = "right" | "left" | "no";

export interface GroupsPreviewType {
    headerRenderMode: HeaderRenderModeEnum;
    headerText: string;
    headerHeading: HeaderHeadingEnum;
    headerContent: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    content: { widgetCount: number; renderer: ComponentType<{caption?: string}> };
    initialCollapsedState: InitialCollapsedStateEnum;
    visible: string;
    dynamicClass: string;
}

export interface AccordionContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    groups: GroupsType[];
    collapsible: boolean;
    expandBehavior: ExpandBehaviorEnum;
    animate: boolean;
    showIcon: ShowIconEnum;
    icon?: DynamicValue<WebIcon>;
    expandIcon?: DynamicValue<WebIcon>;
    collapseIcon?: DynamicValue<WebIcon>;
    animateIcon: boolean;
    advancedMode: boolean;
}

export interface AccordionPreviewProps {
    class: string;
    style: string;
    groups: GroupsPreviewType[];
    collapsible: boolean;
    expandBehavior: ExpandBehaviorEnum;
    animate: boolean;
    showIcon: ShowIconEnum;
    icon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    expandIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    collapseIcon: { type: "glyph"; iconClass: string; } | { type: "image"; imageUrl: string; } | null;
    animateIcon: boolean;
    advancedMode: boolean;
}
