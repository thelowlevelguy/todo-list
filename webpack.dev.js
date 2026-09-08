import {merge} from "webpack-merge";
import common from "./src/webpack.common.js";

export default merge(common, {
	mode: "development",
	devtool: "inline-source-map",
	devServer: {
		static: "./dist"
	},
});