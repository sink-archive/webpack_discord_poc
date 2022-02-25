import Simian from "simian";

const wpRequire = webpackChunkdiscord_app.push([
	[Symbol("webpackcord")],
	modules,
	e => e
]);

if (Object.keys(wpRequire.c).some(k => typeof k === "string" && k.startsWith("wc")))
	throw new Error ("webpackcord appears to exist already")

const patcher = new Simian("webpackcord");

const modules = {
	wp_patch: {
		after: patcher.after,
		before: patcher.before,
		instead: patcher.instead
	},
	wp_webpack: {
		find: (filter) => {
			for (const module of Object.entries(wpRequire.c)) {
				if (module.exports?.default && module.exports?.__esModule && filter(module.exports.default))
					return module.exports.default;

				if (filter(module.exports))
					return module.exports;
			}
		},

		findByProps: (...props) => modules.wp_webpack.find(m => props.every(p => m?.[p] !== undefined)),

		findByDisplayName: (dName) => modules.wp_webpack.find(m => m?.displayName === dName),

		getParentModule: (mod) => module.wp_webpack.find(m => m?.default === mod)
	},
	wp_util: {
		uninject: () => {
		patcher.cleanupAll()
			for (const id in modules)
				delete wpRequire.c[id];
		}
	}
};

for (const [id, content] of Object.entries(modules))
	wpRequire.c[id] = { id, loaded: true, exports: content };

console.log("webpackcord is injected")