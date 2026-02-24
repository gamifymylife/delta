#!/usr/bin/env python3
"""
project_tree.py

Print a compact ASCII folder tree for the project,
excluding venv and other noisy directories.

Usage:
    python project_tree.py
"""

from pathlib import Path

# Directories to ignore anywhere in the tree
IGNORE_DIRS = {
    "venv", "env", ".git", "__pycache__", ".mypy_cache",
    ".pytest_cache", ".idea", ".vscode"
}

# Files to ignore by name
IGNORE_FILES = {
    ".gitignore", ".DS_Store"
}

# Optional: limit depth so the tree stays compact
MAX_DEPTH = 4


def is_ignored_dir(path: Path) -> bool:
    return path.name in IGNORE_DIRS


def is_ignored_file(path: Path) -> bool:
    return path.name in IGNORE_FILES


def print_tree(root: Path, prefix: str = "", depth: int = 0) -> None:
    if depth > MAX_DEPTH:
        return

    # Collect children (dirs first, then files), filtered
    dirs = []
    files = []
    for child in sorted(root.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower())):
        if child.is_dir():
            if not is_ignored_dir(child):
                dirs.append(child)
        else:
            if not is_ignored_file(child):
                files.append(child)

    total = len(dirs) + len(files)
    for i, node in enumerate(dirs + files):
        is_last = (i == total - 1)
        connector = "└── " if is_last else "├── "

        print(prefix + connector + node.name)

        if node.is_dir():
            extension = "    " if is_last else "│   "
            print_tree(node, prefix + extension, depth + 1)


def main():
    root = Path(".").resolve()
    print(root.name)
    print_tree(root)


if __name__ == "__main__":
    main()
