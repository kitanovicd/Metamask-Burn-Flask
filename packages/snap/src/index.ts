import {
  OnRpcRequestHandler,
  OnTransactionHandler,
} from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  console.log('usoooo');
  console.info('asdfss');
  switch (request.method) {
    case 'hello':
      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });
    default:
      throw new Error('Method not found.');
  }
};

const BURN_ADDRESSES = [
  '0x0000000000000000000000000000000000000000',
  '0xdAC17F958D2ee523a2206206994597C13D831ec7'.toLowerCase(),
];

export const onTransaction: OnTransactionHandler = async ({ transaction }) => {
  const to = transaction.to!.toString().toLowerCase();

  if (BURN_ADDRESSES.includes(to)) {
    return {
      content: panel([
        text('ALERT: This transaction is sending funds to a burn address!!!'),
      ]),
    };
  }

  for (const burnAddress of BURN_ADDRESSES) {
    if (burnAddress == '0x0000000000000000000000000000000000000000') continue;

    if (
      transaction.data?.toString().toLowerCase().includes(burnAddress.slice(2))
    ) {
      return {
        content: panel([
          text('ALERT: This transaction is sending funds to a burn address!!!'),
        ]),
      };
    }
  }

  return {
    content: text(
      `We didn't recognize this transaction as burning transaction`,
    ),
  };
};
