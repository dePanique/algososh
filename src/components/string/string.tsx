import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const StringComponent: React.FC = () => {
  return (
    <SolutionLayout title="Строка">
      <form className="">
        <Input />
        <Button />
      </form>
      <div>
        <Circle />
      </div>
    </SolutionLayout>
  );
};
