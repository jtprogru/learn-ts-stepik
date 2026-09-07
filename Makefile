.DEFAULT_GOAL := help

.PHONY: help install install-ci build test

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	npm install

install-ci: ## Install dependencies from lock file (CI)
	npm ci

build: ## Compile TypeScript
	npm run build

test: ## Run tests
	npm run test
