import { Card, CardFooter, Image } from "@nextui-org/react";

interface ISelectableProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export const Selectable = ({
  label,
  selected = false,
  onClick,
}: ISelectableProps) => {
  return (
    <Card
      isFooterBlurred
      className="p-0 m-o w-full h-full relative"
      shadow="none"
      radius="md"
      isPressable
      onPress={onClick}
      classNames={{
        base: selected && "border-primary border-4",
      }}
    >
      <Image
        alt={label}
        width="100%"
        height="100%"
        radius="md"
        className="object-cover"
        src="https://www.mediacenterone.mx/wp-content/uploads/2021/04/ff01cba7-marketing-y-ventas-roi.jpg"
      />
      <CardFooter className="bg-black/40 absolute bottom-4 z-10 w-fit right-4 rounded-full">
        <p className=" text-white">{label}</p>
      </CardFooter>
    </Card>
  );
};
