.DEFAULT_GOAL := help

.PHONY: help install install-ci build test test-report

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

test-report: ## Run tests and write junit/html reports to ./reports
	CI=1 npm run test
