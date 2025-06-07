'use client';

import { useEffect } from 'react';

import type { TOnKeyUp } from '@/interfaces';

const queue: Record<string, { itemHandler: TOnKeyUp; orderInKeyQueue: number }[]> = {};

let isAddEventListener = false;

const removeEventListener = () => {
  if (!Object.keys(queue).length && isAddEventListener) {
    isAddEventListener = false;
    window.removeEventListener('keyup', handleKeyUp);
  }
};

const handleKeyUp = (evt: KeyboardEvent) => {
  const { key } = evt;

  if (queue[key]?.length) {
    const keyQueue = queue[key];
    const maxOrderInKeyQueue = Math.max.apply(
      null,
      keyQueue.map(({ orderInKeyQueue }) => orderInKeyQueue)
    );

    let itemIndex = keyQueue.length - 1;

    if (maxOrderInKeyQueue > 0) {
      itemIndex = keyQueue.findIndex(
        ({ orderInKeyQueue }) => orderInKeyQueue === maxOrderInKeyQueue
      );
    }

    (evt.target as any).blur();

    const { itemHandler } = keyQueue.splice(itemIndex, 1)[0];
    itemHandler(evt);

    if (!keyQueue.length) {
      delete queue[key];

      removeEventListener();
    }
  }
};

const deleteItemHandler = (targetKey: string, onKeyUp: TOnKeyUp) => {
  const keyQueue = queue[targetKey];

  if (keyQueue?.length) {
    const index = keyQueue.findIndex(({ itemHandler }) => itemHandler === onKeyUp);

    if (index > -1) {
      keyQueue.splice(index, 1);

      if (!keyQueue.length) {
        delete queue[targetKey];

        removeEventListener();
      }
    }
  }
};

export const useKeyUpGlobal = (
  targetKey: string,
  onKeyUp: TOnKeyUp,
  orderInKeyQueue = 0,
  isListenerStopped: boolean = false
) => {
  useEffect(() => {
    if (!isListenerStopped) {
      const item = { itemHandler: onKeyUp, orderInKeyQueue };

      if (!queue[targetKey]) {
        queue[targetKey] = [item];
      } else {
        if (orderInKeyQueue > 0 && process.env.NODE_ENV === 'development') {
          const index = queue[targetKey].findIndex(
            ({ orderInKeyQueue: orderInQueueItem }) => orderInQueueItem === orderInKeyQueue
          );

          if (index > -1) {
            console.error('numberInKeyQueue already exists');
          }
        }

        queue[targetKey].push(item);
      }

      if (!isAddEventListener) {
        isAddEventListener = true;
        window.addEventListener('keyup', handleKeyUp);
      }
    } else {
      deleteItemHandler(targetKey, onKeyUp);
    }

    return () => deleteItemHandler(targetKey, onKeyUp);
  }, [isListenerStopped, onKeyUp, orderInKeyQueue, targetKey]);
};
