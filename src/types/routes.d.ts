import { RouteComponentProps, StaticContext } from "react-router";


export type CameraProps = RouteComponentProps<{}, StaticContext, unknown>;
export type ConfigProps = RouteComponentProps<{}, StaticContext, unknown>;
export type DataProps = RouteComponentProps<{ id: string }, StaticContext, unknown>;
export type TableProps = RouteComponentProps<{ type: string }, StaticContext, unknown>;