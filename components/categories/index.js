import { useEffect, useState } from "react";
import { Button } from "../button";

export const Categories = ({
  categories,
  onChange,
  onUnselect,
  autoSelect,
}) => {
  const [category, setCategory] = useState();
  const shouldRender = categories?.filter((c) => !c.nomeCategoriaMae).length;

  useEffect(() => {
    if (autoSelect && !category && categories) {
      onChange(categories[0]);
      setCategory(categories[0]);
    }
  }, [category, autoSelect, categories]);

  if (!shouldRender) return null;
  return (
    <div className="flex gap-3">
      {categories
        ?.filter((c) => !c.nomeCategoriaMae)
        .map((c) => (
          <div key={c.id} className="flex flex-col gap-2">
            <Button
              size="xs"
              className={
                category?.id === c.id && "!bg-zinc-500 !hover:bg-zinc-500"
              }
              onClick={() => {
                setCategory(c);
                onChange(c);
                if (onUnselect && category?.id === c.id) {
                  setCategory(undefined);
                  onUnselect();
                }
              }}
            >
              {c.nome}
            </Button>

            {category?.id === c.id && (
              <Categories
                categories={categories
                  .filter((a) => a.nomeCategoriaMae)
                  .map((a) => ({
                    ...a,
                    nomeCategoriaMae:
                      a.nomeCategoriaMae === c.nome ? null : a.nomeCategoriaMae,
                  }))}
                onChange={onChange}
                onUnselect={() => onChange(c)}
              />
            )}
          </div>
        ))}
    </div>
  );
};
