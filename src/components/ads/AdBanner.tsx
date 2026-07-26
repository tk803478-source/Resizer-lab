import { useMemo } from "react";

interface AdBannerProps {
  adKey: string;
  width: number;
  height: number;
  className?: string;
}

/**
 * Renders an atOptions iframe ad inside an isolated iframe so the
 * document.write based loader cannot interfere with the React app.
 */
export function AdBanner({ adKey, width, height, className }: AdBannerProps) {
  const srcDoc = useMemo(
    () => `<!doctype html><html><head><meta charset="utf-8"><style>html,body{margin:0;padding:0;overflow:hidden}</style></head><body>
<script type="text/javascript">
  atOptions = {
    'key' : '${adKey}',
    'format' : 'iframe',
    'height' : ${height},
    'width' : ${width},
    'params' : {}
  };
<\/script>
<script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"><\/script>
</body></html>`,
    [adKey, width, height]
  );

  return (
    <div className={`flex justify-center overflow-hidden ${className ?? ""}`}>
      <iframe
        title="advertisement"
        srcDoc={srcDoc}
        width={width}
        height={height}
        scrolling="no"
        frameBorder={0}
        style={{ maxWidth: "100%", border: "none" }}
      />
    </div>
  );
}
