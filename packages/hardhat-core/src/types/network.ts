import { EventEmitter } from "events";

import { ResolvedNetworkConfig } from "./config";

export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

export interface ProviderRpcError extends Error {
  code: number;
  data?: unknown;
}

export interface ProviderMessage {
  readonly type: string;
  readonly data: unknown;
}

export interface EthSubscription extends ProviderMessage {
  readonly type: "eth_subscription";
  readonly data: {
    readonly subscription: string;
    readonly result: unknown;
  };
}

export interface ProviderConnectInfo {
  readonly chainId: string;
}

// TODO-HH: Improve the types
export interface EIP1193Provider extends EventEmitter {
  request(args: RequestArguments): Promise<unknown>;
}

export interface JsonRpcRequest {
  jsonrpc: string;
  method: string;
  params: any[];
  id: number;
}

export interface JsonRpcResponse {
  jsonrpc: string;
  id: number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export interface EthereumProvider extends EIP1193Provider {
  send(method: string, params?: any[]): Promise<any>;
  sendAsync(
    payload: JsonRpcRequest,
    callback: (error: any, response: JsonRpcResponse) => void
  ): void;
}

// This alias is here for backwards compatibility
export type IEthereumProvider = EthereumProvider;

export interface Network {
  name: string;
  config: ResolvedNetworkConfig;
  provider: EthereumProvider;
}
