import {merge} from "webpack-merge";
import common from "./src/webpack.common.js";

export default merge(common, {
	mode: "production"	
});