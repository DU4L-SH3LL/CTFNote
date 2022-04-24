#! /bin/bash

# check if folder contains two files with the same number
# if yes, then delete the second file

cd ./api/migrations/

# get all filenames in folder as array
files=($(ls -1))

# strip filenames after first dash
filenames=()
for file in "${files[@]}"; do
  filenames+=("${file%%-*}")
done

if ((${#filenames[@]} > 0)); then
  echo >&2 "array has duplicates:"
  printf >&2 ' - "%s"\n' "${dups[@]}"
  exit 1
fi
