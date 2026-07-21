type ProgressBarProps = {
  step: number;
};

export default function ProgressBar({ step }: ProgressBarProps) {
  const steps = [
    "Personal",
    "Address",
    "Income",
    "Documents",
    "Review",
  ];

  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((item, index) => (
        <div key={index} className="flex-1 text-center">
          <div
            className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center text-white font-bold
              ${
                index + 1 <= step
                  ? "bg-blue-600"
                  : "bg-gray-300 text-black"
              }`}
          >
            {index + 1}
          </div>

          <p className="mt-2 text-sm">{item}</p>
        </div>
      ))}
    </div>
  );
}