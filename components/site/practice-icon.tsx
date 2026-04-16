import {
  BadgeDollarSign,
  BriefcaseBusiness,
  FileText,
  Landmark,
  ReceiptText,
  Scale
} from "lucide-react";

const icons = {
  BadgeDollarSign,
  BriefcaseBusiness,
  FileText,
  Landmark,
  ReceiptText,
  Scale
};

export function PracticeIcon({
  icon,
  className = "h-6 w-6"
}: {
  icon: keyof typeof icons | string;
  className?: string;
}) {
  const Component = icons[icon as keyof typeof icons] ?? Scale;
  return <Component className={className} />;
}
