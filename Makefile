build:
	@echo "[" > questions/index.json
	@ls questions/*.js | sed 's|questions/||; s|\.js||' | \
	awk '{printf "  {\"name\":\"%s\",\"file\":\"%s\"},\n", $$0, $$0}' >> questions/index.json
	@sed -i '' '$$ s/,$$//' questions/index.json
	@echo "]" >> questions/index.json