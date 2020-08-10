# Scrapy Command Runner for VS Code

This is a simple extension that helps you run essential Scrapy commands such as running your Scrapy spiders directly on VS Code.

## Features

The extension adds 2 commands to VS Code's Command Palette. Both commands behave similarly but trigger a different shell function. When either commands are ran, it finds the name of the spider in the currently active file and runs a specific, user-defined, shell function (details in the "requirements" section below) with the spider's name.

Commands:

- `Scrapy: Run Spider` - runs the `spider-run` shell script. Used for running a spider.
- `Scrapy: Test Spider` - runs the `spider-test` shell script. Used for testing a spider (if applicable).

## Requirements

The current version of the extension requires a few things in order to work properly:

- Single spider class per file.
- The spider's class `name` field should be defined as early as possible, best if right under the `class` definition.
- The extension (currently) relies on the existence of specific shell functions to run. If there's demand, this may change in the future. The shell functions should be defined in your VS Code's default shell's startup file (`.bash_profile / .bashrc / .zshrc / etc..`).
  - `spider-run`: should first clear the Scrapy logs & output files (if applicable) and then run the `scrapy crawl` command with the passed argument (the spider name). Example:
    ```shell
    spider-run() {
      echo "" > logs.log
      echo "" > output.json
      scrapy crawl $1 -o output.json
    }
    ```
  - `spider-test`: should first clear the Scrapy logs & test output files (if applicable) and then run the `scrapy crawl` command with the passed argument (the spider name). Example:
    ```shell
    spider-test() {
      echo "" > logs.log
      echo "" > test_output_log.log
      python path/to/spider_tester_script.py $1 -o test_output_log.log
    }
    ```

### Version History

See [CHANGELOG.md](CHANGELOG.md).

### License

[The MIT License](LICENSE)
