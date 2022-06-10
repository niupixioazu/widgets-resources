import { ReactNode, createElement, useCallback } from "react";
import { ButtonWebContainerProps } from "../typings/ButtonWebProps";
import { executeAction } from "@mendix/piw-utils-internal";
import { checkPathPermission } from "./utils/utils";
import { PopConpemnet, ButtonConpemnet } from "./components/ButtonWeb";
import "./ui/ButtonWeb.css";

import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { confirm } = Modal;

export function ButtonWeb(props: ButtonWebContainerProps): ReactNode {
    const {
        block,
        href,
        ghost,
        loading,
        danger,
        disabled,
        size,
        icon,
        shape,
        type,
        text,
        openconfirm, // Open the confirmation pop-up window before executing microflow
        confirmType,
        confirmtitle,
        confirmokText,
        confirmcancelText,
        confirmokType
    } = props;

    const onCancel = useCallback(() => executeAction(props.onCancel), [props.onCancel]);
    const onClickAction = useCallback(() => executeAction(props.onClickAction), [props.onClickAction]);
    const onConfirm = useCallback(() => executeAction(props.onConfirm), [props.onConfirm]);
    // button click event
    const onClick = useCallback((): void => {
        if (openconfirm && confirmType === "modal") {
            confirm({
                title: confirmtitle?.value,
                icon: <ExclamationCircleOutlined />,
                okText: confirmokText,
                okType: confirmokType,
                cancelText: confirmcancelText,
                onOk: onConfirm,
                onCancel
            });
        } else {
            onClickAction();
        }
    }, [
        confirmType,
        confirmcancelText,
        confirmokText,
        confirmokType,
        confirmtitle?.value,
        onCancel,
        onClickAction,
        onConfirm,
        openconfirm
    ]);
    // If do not have permission, it will not be displayed
    if (!checkPathPermission(props.authPath)) {
        return null;
    }
    const shapeData = shape === "circle" ? "circle" : shape === "round" ? "round" : undefined;
    const textData = text.trim() === "" ? undefined : text;

    const ButtonWebView = (
        <ButtonConpemnet
            disabled={!!(disabled && disabled.value)}
            danger={danger && danger.value}
            loading={loading && loading.value}
            ghost={ghost}
            block={block}
            href={href ? href : undefined}
            size={size}
            shape={shapeData}
            type={type}
            onClick={onClick}
            icon={icon?.value}
        >
            {textData}
        </ButtonConpemnet>
    );

    return (
        <div className={props.class} style={props.style} tabIndex={props.tabIndex}>
            {openconfirm && confirmType === "pop" ? (
                <PopConpemnet
                    confirmokText={confirmokText}
                    confirmcancelText={confirmcancelText}
                    confirmokType={confirmokType}
                >
                    {ButtonWebView}
                </PopConpemnet>
            ) : (
                ButtonWebView
            )}
        </div>
    );
}
