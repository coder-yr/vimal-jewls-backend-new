import { ComponentLoader } from "adminjs";
import path from "path";
const loader = new ComponentLoader();
const components = {
  DashboardComponent: loader.add(
    "DashboardComponent",
    path.resolve("./components/dashboard/dashboard.jsx")
  ),
  UploadSingleImage: loader.add(
    "UploadSingleImage",
    path.resolve("./components/common/single_image_upload.jsx")
  ),
  ViewSingleImage: loader.add(
    "ViewSingleImage",
    path.resolve("./components/common/view_single_image.jsx")
  ),
  CreateStringList: loader.add(
    "CreateStringList",
    path.resolve("./components/common/string_list.jsx")
  ),
  ViewStringList: loader.add(
    "ViewStringList",
    path.resolve("./components/common/string_list_view.jsx")
  ),
  DescriptionRichText: loader.add(
    "DescriptionRichText",
    path.resolve("./components/product/description_rich.jsx")
  ),
  KeyValueList: loader.add(
    "KeyValueList",
    path.resolve("./components/product/key_value.jsx")
  ),
  UploadMultipleImage: loader.add(
    "UploadMultipleImage",
    path.resolve("./components/common/multiple_image_upload.jsx")
  ),
  SizeColorStock: loader.add(
    "SizeColorStock",
    path.resolve("./components/product/size_color_stock.jsx")
  ),
  SizeChart: loader.add(
    "SizeChart",
    path.resolve("./components/product/size_chart.jsx")
  ),
};

export { loader, components };
