import { X } from 'lucide-react';

const ErrorToast = ({ message }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
      <div className="flex items-center space-x-2">
        <X size={16} />
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );
};

export default ErrorToast;