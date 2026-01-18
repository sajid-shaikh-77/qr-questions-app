import { getPlatform } from "../../utils/platform";

export default function PermissionHelpModal({ open, onClose }) {
  if (!open) return null;

  const platform = getPlatform();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-2">Enable Microphone</h3>

        {platform === "ios" && (
          <ul className="text-sm text-gray-700 space-y-1">
            <li>1. Open <b>Settings</b></li>
            <li>2. Go to <b>Safari</b></li>
            <li>3. Tap <b>Microphone</b></li>
            <li>4. Select <b>Allow</b></li>
            <li>5. Reload this page</li>
          </ul>
        )}

        {platform === "android" && (
          <ul className="text-sm text-gray-700 space-y-1">
            <li>1. Tap the 🔒 icon in address bar</li>
            <li>2. Open <b>Site settings</b></li>
            <li>3. Enable <b>Microphone</b></li>
            <li>4. Reload this page</li>
          </ul>
        )}

        {platform === "desktop" && (
          <p className="text-sm text-gray-700">
            Please enable microphone access in your browser settings.
          </p>
        )}

        <button
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-lg bg-crescent-green text-black"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
