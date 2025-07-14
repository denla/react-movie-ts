import ContentLoader from "react-content-loader";
import CoverLoader from "./CoverLoader";

const SearchCardLoader = (props) => (
  <div className="card-skeleton search-card">
    <div className="card__cover-wrapper card-cover">
      <CoverLoader />
    </div>

    <div className="card__info-loader">
      <ContentLoader
        speed={1}
        width="100%"
        height="100%"
        //   viewBox="0 0 400 160"
        backgroundColor="#7171713c"
        foregroundColor="rgba(141, 141, 141, 0.56)"
        {...props}
      >
        <rect x="0" y="0" rx="4" ry="4" width="80%" height="16" />
        <rect x="0" y="24" rx="4" ry="4" width="57" height="16" />
      </ContentLoader>
    </div>
  </div>
);

export default SearchCardLoader;
