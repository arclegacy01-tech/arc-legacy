import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Normalizes API base URL for EventSource
 */
function getStreamUrl() {
  const base = import.meta.env.VITE_API_URL || '/api';
  const trimmed = base.replace(/\/$/, '');
  const apiRoot = trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
  return `${apiRoot}/admin/realtime-stream`;
}

/**
 * Custom hook that listens to live real-time admin sync events
 * via Server-Sent Events (SSE) with background polling fallback.
 *
 * @param {string|string[]} eventTypes - e.g. ['order_created', 'order_updated', 'inventory_updated'] or '*'
 * @param {function} callback - callback triggered on event
 */
export function useAdminLiveListener(eventTypes, callback) {
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    const types = Array.isArray(eventTypes) ? eventTypes : [eventTypes];
    let eventSource = null;
    let fallbackInterval = null;

    try {
      eventSource = new EventSource(getStreamUrl());

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (!data || !data.type) return;

          if (types.includes('*') || types.includes(data.type)) {
            if (cbRef.current) {
              cbRef.current(data);
            }
          }
        } catch {
          // ignore non-json pings
        }
      };

      eventSource.onerror = () => {
        // Browser EventSource automatically reconnects on error
      };
    } catch {
      // EventSource unavailable, fallback to interval
    }

    // Safety polling fallback every 20s to ensure guaranteed data synchronization
    fallbackInterval = setInterval(() => {
      if (cbRef.current) {
        cbRef.current({ type: 'poll_sync', timestamp: new Date().toISOString() });
      }
    }, 20000);

    return () => {
      if (eventSource) eventSource.close();
      if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [Array.isArray(eventTypes) ? eventTypes.join(',') : eventTypes]);
}

/**
 * Hook that executes fetcher, manages state (data, loading, error),
 * and automatically refetches on SSE events or fallback poll.
 *
 * @param {function} fetcherFn - async function returning data
 * @param {string|string[]} eventTypes - events to listen for
 * @param {Array} deps - additional dependency array
 * @returns {{ data: any, loading: boolean, error: any, refresh: function }}
 */
export function useAdminAutoRefresh(fetcherFn, eventTypes = '*', deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fnRef = useRef(fetcherFn);
  fnRef.current = fetcherFn;

  const refresh = useCallback(async () => {
    if (!fnRef.current) return;
    try {
      setLoading(true);
      const res = await fnRef.current();
      setData(res);
      setError(null);
      return res;
    } catch (err) {
      console.warn('[useAdminAutoRefresh]', err.message || err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh, ...deps]);

  useAdminLiveListener(eventTypes, () => {
    refresh();
  });

  return { data, loading, error, refresh };
}
