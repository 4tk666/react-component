import clsx from 'clsx';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import ReactPaginate from 'react-paginate';

export type PaginateSelected = {
  selected: number;
};

type Props = {
  pageCount: number;
  forcePage: number;
  handlePageClick?: ({ selected }: PaginateSelected) => void;
};

const rootClassName = clsx(
  'inline-flex items-center gap-[10px]',
  'text-text-10 font-bold where:text-gray-2',
);
const linkClassName = clsx(
  'h-[25px] min-w-[25px] where:px-[5px]',
  'flex items-center justify-center',
  'hover:bg-background-3',
  'rounded-[4px] border-gray-7 where:border',
  'where:bg-white',
  'focus-visible:isolate focus-visible:rounded-focus focus-visible:shadow-focus focus-visible:outline-none',
);
const arrowLinkClassName = clsx('p-[0px] text-[20px]');
const activeLinkClassName = clsx(
  'border-none bg-green-1 text-white hover:bg-green-1 hover:text-white',
);

const Paginate = ({ pageCount, forcePage, handlePageClick }: Props) => {
  return (
      <ReactPaginate
        onPageChange={handlePageClick}
        pageCount={pageCount}
        forcePage={forcePage}
        //NOTE: 現在のページ前後に何要素分表示させるか
        pageRangeDisplayed={3}
        //NOTE: 先頭と末尾に表示する要素数
        marginPagesDisplayed={1}
        breakLabel='...'
        nextLabel={<MdNavigateNext />}
        previousLabel={<MdNavigateBefore />}
        className={rootClassName}
        breakLinkClassName={linkClassName}
        nextLinkClassName={`${linkClassName} ${arrowLinkClassName}`}
        previousLinkClassName={`${linkClassName} ${arrowLinkClassName}`}
        pageLinkClassName={linkClassName}
        activeLinkClassName={activeLinkClassName}
      />
  );
};

export default Paginate;
