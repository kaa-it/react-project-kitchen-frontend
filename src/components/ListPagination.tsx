import React, { SyntheticEvent } from "react";
import agent from "../agent";
import { ISetPageParams, setPage, TPager } from "../services/articleListSlice";
import { useAppDispatch } from "../services";

interface IListPaginationProps {
  pager: TPager | null;
  articlesCount: number;
  currentPage: number;
}

const ListPagination: React.FC<IListPaginationProps> = ({
  pager,
  articlesCount,
  currentPage,
}) => {
  const dispatch = useAppDispatch();

  if (articlesCount <= 10) {
    return null;
  }

  const range = [];
  for (let i = 0; i < Math.ceil(articlesCount / 10); ++i) {
    range.push(i);
  }

  const handleSetPage = (page: number) => {
    const params: ISetPageParams = {
      page,
      fetcher: pager ? pager(page) : agent.Articles.all(page),
    };

    dispatch(setPage(params));
  };

  return (
    <nav>
      <ul className="pagination">
        {range.map((v) => {
          const isCurrent = v === currentPage;
          const onClick = (ev: SyntheticEvent) => {
            ev.preventDefault();
            handleSetPage(v);
          };
          return (
            <li
              className={isCurrent ? "page-item active" : "page-item"}
              onClick={onClick}
              key={v.toString()}
            >
              <a className="page-link" href="">
                {v + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ListPagination;
