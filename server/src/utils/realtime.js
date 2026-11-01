import { EventEmitter } from 'events';

class AdminEventBus extends EventEmitter {}

export const adminEventBus = new AdminEventBus();
// Increase listener limit to accommodate multiple admin browser tabs
adminEventBus.setMaxListeners(100);

/**
 * Broadcast an event to all connected admin clients
 * @param {string} type - e.g. 'order_created', 'order_updated', 'inventory_updated', 'customer_registered'
 * @param {object} payload - data associated with the event
 */
export function broadcastAdminEvent(type, payload = {}) {
  const event = {
    type,
    payload,
    timestamp: new Date().toISOString(),
  };
  adminEventBus.emit('admin_event', event);
}

/**
 * Server-Sent Events (SSE) stream handler for live admin synchronization
 */
export function realtimeStreamHandler(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache, no-transform',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
  });

  // Initial connection heartbeat
  res.write(`data: ${JSON.stringify({ type: 'connected', timestamp: new Date().toISOString() })}\n\n`);

  const onEvent = (event) => {
    res.write(`data: ${JSON.stringify(event)}\n\n`);
  };

  adminEventBus.on('admin_event', onEvent);

  // Keep-alive ping every 25s
  const pingInterval = setInterval(() => {
    res.write(':ping\n\n');
  }, 25000);

  req.on('close', () => {
    clearInterval(pingInterval);
    adminEventBus.off('admin_event', onEvent);
  });
}

