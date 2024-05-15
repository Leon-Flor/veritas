import { Card, Image, CardHeader } from "@nextui-org/react";

export const SelectedCard = () => {
  return (
    <Card className="col-span-12 sm:col-span-4 h-[300px]" isBlurred>
      <CardHeader className="absolute z-10 top-1 flex-col !items-start">
        <p className="text-tiny text-white/60 uppercase font-bold">
          What to watch
        </p>
        <h4 className="text-white font-medium text-large">
          Stream the Acme event
        </h4>
      </CardHeader>
      <Image
        isBlurred
        removeWrapper
        alt="Card background"
        className="z-0 w-full h-full object-cover"
        src="https://nextui.org/images/card-example-4.jpeg"
      />
    </Card>
  );
};
